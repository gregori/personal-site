"use client";

import { Component } from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border border-card-border bg-background/95 backdrop-blur-xl p-5 shadow-2xl">
          <p className="text-sm font-semibold text-foreground">Chat unavailable</p>
          <p className="mt-1 text-xs text-muted">
            Something went wrong. Please refresh the page to try again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
