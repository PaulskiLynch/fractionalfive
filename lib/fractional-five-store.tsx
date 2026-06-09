"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
} from "react";
import {
  operatorProfiles,
  dashboardEngagements,
  type AuditEvent,
  operatorProfile,
  type DashboardEngagement,
  type OperatorRecord,
  type OperatorProfile,
} from "@/lib/fractional-five-data";
import { useLocalStorageState } from "@/lib/use-local-storage-state";

type FractionalFiveState = {
  operators: OperatorRecord[];
  selectedOperatorId: string;
  selectedBlockId: string;
  engagements: DashboardEngagement[];
  selectedEngagementId: string;
};

type FractionalFiveStore = {
  state: FractionalFiveState;
  setState: Dispatch<SetStateAction<FractionalFiveState>>;
  hydrated: boolean;
  activeOperator: OperatorRecord;
  visibleEngagements: DashboardEngagement[];
  selectOperator: (operatorId: string) => void;
  updateOperatorProfile: (updater: (profile: OperatorProfile) => OperatorProfile) => void;
  updateEngagement: (
    engagementId: string,
    updater: (engagement: DashboardEngagement) => DashboardEngagement,
    auditEvent?: Omit<AuditEvent, "id" | "date" | "actor">,
  ) => void;
  createEngagement: (engagement: DashboardEngagement) => void;
  resetState: () => void;
};

function getDefaultBlockId(profile: OperatorProfile) {
  return profile.blocks.find((block) => block.available)?.id ?? profile.blocks[0]?.id ?? "";
}

function getVisibleEngagements(engagements: DashboardEngagement[], operatorId: string) {
  return engagements.filter((engagement) => engagement.operatorId === operatorId);
}

function getDefaultEngagementId(engagements: DashboardEngagement[], operatorId: string) {
  return getVisibleEngagements(engagements, operatorId)[0]?.id ?? engagements[0]?.id ?? "";
}

function createInitialState(): FractionalFiveState {
  return {
    operators: structuredClone(operatorProfiles),
    selectedOperatorId: operatorProfiles[0]?.id ?? "default-operator",
    selectedBlockId: getDefaultBlockId(operatorProfile),
    engagements: structuredClone(dashboardEngagements),
    selectedEngagementId: getDefaultEngagementId(dashboardEngagements, operatorProfiles[0]?.id ?? ""),
  };
}

const initialState: FractionalFiveState = createInitialState();

const FractionalFiveStoreContext = createContext<FractionalFiveStore | null>(null);

export function FractionalFiveStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState, hydrated] = useLocalStorageState<FractionalFiveState>(
    "fractionalfive.shared-store",
    initialState,
  );

  const activeOperator =
    state.operators.find((operator) => operator.id === state.selectedOperatorId) ?? state.operators[0];
  const visibleEngagements = activeOperator
    ? getVisibleEngagements(state.engagements, activeOperator.id)
    : state.engagements;

  const value = useMemo<FractionalFiveStore>(
    () => ({
      state,
      setState,
      hydrated,
      activeOperator,
      visibleEngagements,
      selectOperator: (operatorId) =>
        setState((current) => {
          const nextOperator =
            current.operators.find((operator) => operator.id === operatorId) ?? current.operators[0];

          if (!nextOperator) {
            return current;
          }

          const nextVisibleEngagements = getVisibleEngagements(current.engagements, nextOperator.id);

          return {
            ...current,
            selectedOperatorId: nextOperator.id,
            selectedBlockId: getDefaultBlockId(nextOperator.profile),
            selectedEngagementId:
              nextVisibleEngagements.find(
                (engagement) => engagement.id === current.selectedEngagementId,
              )?.id ?? nextVisibleEngagements[0]?.id ?? current.selectedEngagementId,
          };
        }),
      updateOperatorProfile: (updater) =>
        setState((current) => ({
          ...current,
          operators: current.operators.map((operator) =>
            operator.id === current.selectedOperatorId
              ? { ...operator, profile: updater(operator.profile) }
              : operator,
          ),
        })),
      updateEngagement: (engagementId, updater, auditEvent) =>
        setState((current) => ({
          ...current,
          engagements: current.engagements.map((engagement) => {
            if (engagement.id !== engagementId) {
              return engagement;
            }

            const nextEngagement = updater(engagement);

            if (!auditEvent) {
              return nextEngagement;
            }

            const operatorName =
              current.operators.find((operator) => operator.id === nextEngagement.operatorId)?.profile.name ??
              "Operator";

            return {
              ...nextEngagement,
              auditTrail: [
                {
                  id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                  date: "Today",
                  actor: operatorName,
                  action: auditEvent.action,
                  detail: auditEvent.detail,
                },
                ...nextEngagement.auditTrail,
              ],
            };
          }),
        })),
      createEngagement: (engagement) =>
        setState((current) => ({
          ...current,
          engagements: [engagement, ...current.engagements],
          selectedEngagementId: engagement.id,
          selectedOperatorId: engagement.operatorId,
          selectedBlockId:
            current.operators
              .find((operator) => operator.id === engagement.operatorId)
              ?.profile.blocks.find((block) => block.label === engagement.block)?.id ??
            current.selectedBlockId,
        })),
      resetState: () => setState(createInitialState()),
    }),
    [activeOperator, hydrated, setState, state, visibleEngagements],
  );

  return (
    <FractionalFiveStoreContext.Provider value={value}>
      {children}
    </FractionalFiveStoreContext.Provider>
  );
}

export function useFractionalFiveStore() {
  const context = useContext(FractionalFiveStoreContext);

  if (!context) {
    throw new Error("useFractionalFiveStore must be used within FractionalFiveStoreProvider");
  }

  return context;
}
