import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type State = 'idle' | 'pending' | 'done' | 'error';
type Result = { text: string; ok?: boolean };
type TestKey = 'scan' | 'loc' | 'perm';

declare global {
  interface Window {
    fdxyNativeScan?: (data: unknown) => void;
    fdxyNativeLocation?: (data: unknown) => void;
    fdxyNativePermission?: (granted: boolean) => void;
  }
}

const pillText: Record<State, string> = {
  idle: '待测试',
  pending: '进行中',
  done: '成功',
  error: '失败',
};

const scheme = (query: string) => `kysk-fdxy-app://native?${query}`;
const formatData = (data: unknown) => JSON.stringify(data, null, 2) ?? String(data);

const isAppUa = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('fzuhelper') || ua.includes('appscheme/kysk-fdxy-app');
};

interface TestButton {
  label: string;
  query: string;
  variant?: 'default' | 'secondary';
}

interface TestDef {
  key: TestKey;
  title: string;
  description: string;
  displayQuery: string;
  buttons: TestButton[];
  pendingLabel: string;
  useTimer?: boolean;
}

const TEST_DEFS: TestDef[] = [
  {
    key: 'scan',
    title: '扫码',
    description: '调起原生扫码页，扫描后返回本页并回传结果',
    displayQuery: 'type=scan&function=fdxyNativeScan',
    pendingLabel: '已触发',
    buttons: [{ label: '测试扫码', query: 'type=scan&function=fdxyNativeScan' }],
  },
  {
    key: 'loc',
    title: '定位',
    description: '获取当前定位并反解出地址',
    displayQuery: 'type=location&function=fdxyNativeLocation',
    pendingLabel: '定位中',
    useTimer: true,
    buttons: [{ label: '获取定位', query: 'type=location&function=fdxyNativeLocation' }],
  },
  {
    key: 'perm',
    title: '定位权限',
    description: '查询或申请定位权限',
    displayQuery: 'type=permission&biz=location&action=0|1&function=fdxyNativePermission',
    pendingLabel: '处理中',
    useTimer: true,
    buttons: [
      { label: '查询权限', query: 'type=permission&biz=location&action=0&function=fdxyNativePermission' },
      {
        label: '申请权限',
        query: 'type=permission&biz=location&action=1&function=fdxyNativePermission',
        variant: 'secondary',
      },
    ],
  },
];

function Pill({ state, text = pillText[state], ms }: { state: State; text?: string; ms?: number }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground',
        state === 'pending' && 'border-primary text-primary',
        state === 'done' && 'border-green-600 text-green-600',
        state === 'error' && 'border-destructive text-destructive'
      )}
    >
      {text}
      {ms !== undefined && <span className="ml-1 font-mono">{ms}ms</span>}
    </span>
  );
}

function ResultBlock({ result, state }: { result?: Result; state: State }) {
  const visible = Boolean(result?.text);
  if (!visible) {
    return ""
  }
  return (
    <div
      className={cn(
        'grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-100 ease-out',
        visible ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
      )}
    >
      <pre
        className={cn(
          'min-h-0 overflow-hidden whitespace-pre-wrap break-all rounded-lg bg-muted font-mono text-xs',
          visible ? 'p-3' : 'border-0 p-0',
          result?.ok === true && 'border border-green-600',
          result?.ok === false && 'border border-destructive',
          state === 'pending' && 'border border-primary'
        )}
      >
        {result?.text ?? ''}
      </pre>
    </div>
  );
}

function TestCard({
  def,
  state,
  result,
  ms,
  onTrigger,
}: {
  def: TestDef;
  state: State;
  result?: Result;
  ms?: number;
  onTrigger: (query: string) => void;
}) {
  return (
    <Card className="gap-2 py-4">
      <CardHeader className="px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle>{def.title}</CardTitle>
            <CardDescription className="mt-1">{def.description}</CardDescription>
          </div>
          <Pill
            state={state}
            text={state === 'pending' ? def.pendingLabel : undefined}
            ms={def.useTimer ? ms : undefined}
          />
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <p className="mb-3 break-all font-mono text-xs text-muted-foreground">{def.displayQuery}</p>
        <div className={cn('grid gap-2', def.buttons.length > 1 && 'grid-cols-2')}>
          {def.buttons.map((btn) => (
            <Button key={btn.label} variant={btn.variant ?? 'default'} onClick={() => onTrigger(btn.query)}>
              {btn.label}
            </Button>
          ))}
        </div>
        <ResultBlock result={result} state={state} />
      </CardContent>
    </Card>
  );
}

export default function FdxyScheme() {
  const startedAtRef = useRef<Partial<Record<TestKey, number>>>({});
  const [elapsed, setElapsed] = useState<Partial<Record<TestKey, number>>>({});
  const [testState, setTestState] = useState<Record<TestKey, State>>({ scan: 'idle', loc: 'idle', perm: 'idle' });
  const [results, setResults] = useState<Partial<Record<TestKey, Result>>>({});

  const setState = (key: TestKey, state: State) => setTestState((prev) => ({ ...prev, [key]: state }));
  const setResult = (key: TestKey, result: Result) => setResults((prev) => ({ ...prev, [key]: result }));

  const beginTimer = (key: TestKey) => {
    startedAtRef.current[key] = performance.now();
    setElapsed((prev) => ({ ...prev, [key]: 0 }));
  };

  const stopTimer = (key: TestKey) => {
    const startedAt = startedAtRef.current[key];
    if (startedAt === undefined) return;

    delete startedAtRef.current[key];
    setElapsed((prev) => ({ ...prev, [key]: Math.round(performance.now() - startedAt) }));
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsed((prev) => {
        const keys = Object.keys(startedAtRef.current) as TestKey[];
        if (keys.length === 0) return prev;

        const next = { ...prev };
        keys.forEach((key) => {
          const startedAt = startedAtRef.current[key];
          if (startedAt !== undefined) next[key] = Math.round(performance.now() - startedAt);
        });
        return next;
      });
    }, 50);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = '智汇福大 Scheme 拦截测试';

    window.fdxyNativeScan = (data) => {
      setState('scan', 'done');
      setResult('scan', { text: `回调返回：${String(data)}`, ok: true });
    };

    window.fdxyNativeLocation = (data) => {
      stopTimer('loc');
      const location = typeof data === 'object' && data !== null ? (data as { lon?: unknown; lat?: unknown }) : {};
      const ok = Boolean(location.lon) && Boolean(location.lat);
      setState('loc', ok ? 'done' : 'error');
      setResult('loc', { text: formatData(data), ok });
    };

    window.fdxyNativePermission = (granted) => {
      stopTimer('perm');
      setState('perm', granted ? 'done' : 'error');
      setResult('perm', { text: `回调返回：${granted}`, ok: granted });
    };

    return () => {
      document.title = previousTitle;
      delete window.fdxyNativeScan;
      delete window.fdxyNativeLocation;
      delete window.fdxyNativePermission;
    };
  }, []);

  useEffect(() => {
    if (isAppUa()) return;

    const timer = window.setTimeout(() => {
      toast.warning('非福uu环境，可能无法正常测试！', { id: 'fdxy-scheme-env-warning' });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  const trigger = (def: TestDef, query: string) => {
    if (def.useTimer) beginTimer(def.key);
    setState(def.key, 'pending');
    window.location.href = scheme(query);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground">
      <div className="mx-auto max-w-2xl space-y-3">
        {TEST_DEFS.map((def) => (
          <TestCard
            key={def.key}
            def={def}
            state={testState[def.key]}
            result={results[def.key]}
            ms={elapsed[def.key]}
            onTrigger={(query) => trigger(def, query)}
          />
        ))}
      </div>
    </main>
  );
}
