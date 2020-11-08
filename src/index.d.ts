declare module "@ecmaservegames/host" {
  import Router from '@koa/router'
  import Application from 'koa'
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
  export type ExceptionToRule<TActions extends ActionsConstraint> = (...ruleNames: (keyof TActions)[]) => void;

  export interface RuleMiddlewareContext<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> {
    actions: ActionSet<TActions>
    gameState: GameState<TState>
    ruleResults: RuleResult[],
    mutate(mutations: GameStateMutation<TState>): Promise<void> | void,
    exceptionTo: ExceptionToRule<TActions>,
    user: TUser
  }

  export type RuleMiddleware<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> 
    = (context: RuleMiddlewareContext<TActions, TState, TUser>) => boolean | Promise<boolean>

  export class Rule<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> {
    constructor(name: string)
    static create<TActions, TState, TUser>(name: string): Rule<TActions, TState, TUser>
    forActions(...actions:(keyof TActions)[]): Rule<TActions, TState, TUser>
    use(middleware: RuleMiddleware<TActions, TState, TUser>): Rule<TActions, TState, TUser>
  }

  export interface MechaniceMiddlewareContext<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> 
  {
    actions: ActionSet<TActions>,
    gameState: GameState<TState>
    user: TUser
  }

  export type MechanicMiddleware<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> 
    = (context: MechaniceMiddlewareContext<TActions, TState, TUser>) => void | Promise<void>

  export class Mechanic<TActions extends ActionsConstraint, TState extends GameStateConstraint, TUser extends UserConstraint> {
    constructor(name: string)
    forActions(...actions:(keyof TActions)[]): Mechanic<TActions, TState, TUser>
    use(middleware: MechanicMiddleware<TActions, TState, TUser>): Mechanic<TActions, TState, TUser>
  }

  export type UserAuthenticationMiddleware<TUserDefinition extends UserConstraint, TState = {}>
    = Application.Middleware<TState & { user: TUserDefinition }>

  export type StateMasks<TState extends GameStateConstraint, TUser extends UserConstraint> = (context: {
    User: TUser,
    mutate(mutation: GameStateMutation<TState>): void | Promise<void>
  }) => void | Promise<void>

  export class GameServer<
    TState extends GameStateConstraint,
    TActions extends ActionsConstraint,
    TUser extends UserConstraint
  > {
    useState<TStateDefinition>(protoFilename: string, packageName: string, initialState: TStateDefinition): GameServer<TStateDefinition, TActions, TUser>
    useActions<TActionsDefinition>(protoFilename: string, packageName: string): GameServer<TState, TActionsDefinition, TUser>
    useAuthentication<TUserDefinition>(userAuthenticationMiddleware: UserAuthenticationMiddleware<TUserDefinition>): GameServer<TState, TActions, TUserDefinition>
    addProtoFiles(...filenames: string[]): GameServer<TState, TActions, TUser>
    useRules(...rules: Rule<TActions, TState, TUser>[]): GameServer<TState, TActions, TUser>
    useMechanics(...mechanics: Mechanic<TActions, TState, TUser>[]): GameServer<TState, TActions, TUser>
    useStateMask(...masks: StateMasks<TState, TUser>[]): GameServer<TState, TActions, TUser>
    addRoutes(routerConfigurationCallback: (router: Router) => void): GameServer<TState, TActions, TUser>
    addMiddleware(configureMiddleware: (app: Application) => void): GameServer<TState, TActions, TUser>
    run(): Promise<GameServer<TState, TActions, TUser>>
    shutdown(): Promise<GameServer<TState, TActions, TUser>>
  }

  export interface GameResponse
  {
    id: string
    relativePathActionsSocket: string
    relativePathStateSocket: string
  }
}