import { useCallback } from "react";
import useStore from "zustand/store";

export const useLoading = () => {
  const {
    loadingTasks,
    startLoading: startLoadingAction,
    stopLoading: stopLoadingAction,
    clearLoadingTasks: clearLoadingTasksAction,
  } = useStore();

  const isTaskLoading = useCallback(
    (task: string) => {
      return loadingTasks.indexOf(task) !== -1;
    },
    [loadingTasks],
  );

  const startLoading = useCallback((task: string) => {
    startLoadingAction(task);
  }, []);

  const stopLoading = useCallback((task: string) => {
    stopLoadingAction(task);
  }, []);

  const clearLoadingTasks = useCallback(() => {
    clearLoadingTasksAction();
  }, []);

  return {
    isLoading: loadingTasks.length > 0,
    isTaskLoading,
    startLoading,
    stopLoading,
    clearLoadingTasks,
  };
};
