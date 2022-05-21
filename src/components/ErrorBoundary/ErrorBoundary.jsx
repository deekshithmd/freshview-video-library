function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="flex">
      <h2>Sumething Went Wrong</h2>
      <pre className="text-sm">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export { ErrorFallBack };
