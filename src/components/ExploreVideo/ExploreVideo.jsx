import "./explorevideo.css";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense, lazy } from "react";
import { SideBar, Filter, Loader, ErrorFallBack } from "..";
import { useData } from "../../contexts";

const VideoList = lazy(() => import("../VideoList/VideoList"));

export const ExploreVideo = () => {
  const { loading, loadtext } = useData();

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        {loading ? (
          <Loader text={loadtext} />
        ) : (
          <>
            <Filter />
            <ErrorBoundary
              FallbackComponent={ErrorFallBack}
              onReset={() => {
                window.location.reload();
              }}
            >
              <Suspense
                fallback={
                  <p className="text-lg text-bold text-center">Loading...</p>
                }
              >
                <VideoList />
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </div>
    </div>
  );
};
