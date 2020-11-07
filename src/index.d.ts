declare module "@ecmaservegames/host" {
  export type ActionsConstraint = {}
  export type GameStateConstraint = {}
  export type UserConstraint = {}
  
  export interface RuleResult
  {
    name: string
    result: boolean
  }
  
  export type ActionSet<TActions extends ActionsConstraint> = TActions & { Action: keyof TActions }
  
  export type GameState<TState extends GameStateConstraint> = TState
  export type GameStateMutation<TState extends GameStateConstraint> = (state: GameState<TState>) => Promise<void> | void
  export type ExceptionToRule<TActions extends ActionsConstraint> = (...ruleNames: [keyof TActions][]) => void;

  export interface RuleMiddlewareContext<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> {
    actions: ActionSet<TActions>
    gameState: GameState<TState>
    ruleResults: RuleResult[],
    mutate: GameStateMutation<TState>,
    exceptionTo: ExceptionToRule<TActions>,
    user: TUser
  }

  export type RuleMiddleware<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> 
    = (context: RuleMiddlewareContext<TActions, TState, TUser>) => boolean | Promise<boolean>

  export class Rule<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> {
    constructor(name: string)
    static create<TActions, TState, TUser>(name: string): Rule<TActions, TState, TUser>
    forActions(...actions:[keyof TActions][]): Rule<TActions, TState, TUser>
    use(middleware: RuleMiddleware<TActions, TState, TUser>): Rule<TActions, TState, TUser>
  }

  export interface MechaniceMiddlewareContext<TActions extends ActionsConstraint, TState extends GameStateConstraint> 
  {
    actions: ActionSet<TActions>,
    gameState: GameState<TState>
  }

  export type MechanicMiddleware<TActions extends ActionsConstraint, TState extends GameStateConstraint> 
    = (context: MechaniceMiddlewareContext<TActions, TState>) => void | Promise<void>

  export class Mechanic<TActions extends ActionsConstraint, TState extends GameStateConstraint> {
    constructor(name: string)
    forActions(...actions:[keyof TActions][]): Mechanic<TActions, TState>
    use(middleware: MechanicMiddleware<TActions, TState>): Mechanic<TActions, TState>
  }

  export type UserAuthenticationMiddleware<TUserDefinition extends UserConstraint, TState = {}>
    = import('koa').Middleware<TState & { user: TUserDefinition }>

  export type StateMasks<TState extends GameStateConstraint, TUser extends UserConstraint> = (context: {
    User: TUser,
    mutate: GameStateMutation<TState>
  }) => void | Promise<void>

  export class GameServer<
    TState extends GameStateConstraint,
    TActions extends ActionsConstraint,
    TUser extends UserConstraint
  > {
    useState<TStateDefinition>(protoFilename: string, packageName: string, initialState: TState): GameServer<TStateDefinition, TActions, TUser>
    useActions<TActionsDefinition>(protoFilename: string, packageName: string): GameServer<TState, TActionsDefinition, TUser>
    useAuthentication<TUserDefinition>(userAuthenticationMiddleware: UserAuthenticationMiddleware<TUserDefinition>): GameServer<TState, TActions, TUserDefinition>
    addProtoFiles(...filenames: string[]): GameServer<TState, TActions, TUser>
    useRules(...rules: Rule<TActions, TState, TUser>[]): GameServer<TState, TActions, TUser>
    useMechanics(...mechanics: Mechanic<TActions, TState>[]): GameServer<TState, TActions, TUser>
    useStateMask(...masks: StateMasks<TState, TUser>[]): GameServer<TState, TActions, TUser>
  }
}