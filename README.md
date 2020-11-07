# EcmaserveGames/host ⬛

EcmaserveGames is intended to be an expressive ecosystem for 
building web-based board(-like) games.

This is a host server for building your game application on. 

## Installation

```
npm install <TBD>
```

## Running the Host

You will need to create your own entry file for Node.JS.

```js
/// index.js
const { GameServer } = require('<TBD>')
const game = new GameServer().run()
```


## Core Concepts

* **Game State**

  This core concept is inspired by uni-direction data flow such 
  as React or Flux. Any particular game instance has a structured
  game state that can be serialized and transmitted from the
  host to any connected participant (either as a player or observer).

  There is a corresponding socket address to receive updates on the game 
  state. i.e. - `https://<hostname>/games/<game_instance_id>/state`

  As noted, game-state is not intended to be computed by the client so 
  it relies on other mechanisms to update and mutate as the game is played.

  EcmaserveGames does not prescribe a game state definition and allows 
  you to build it, as needed. The supported format for describing your 
  state definition is Protocol Buffers or protobuf and requires a singular 
  `State` message. 
  [🔗 Read More about Protocol Buffers](https://developers.google.com/protocol-buffers/docs/overview)

  ```proto
  /// state.proto

  package testgame;
  syntax = "proto3";
  message State { /// <-- Required name
    string current_player_id = 2;
    int32 current_player_roll_count = 3;
  }
  ```

  Loading these `State` messages is done as part of the host's builder 
  pattern. You will need to supply a `filename`, `packageName` and 
  optionally an initial game state for any created game instances.

  ```js
  /// index.js
  const { GameServer } = require('<TBD>')
  const path = require('path')

  const game = new GameServer()
    .useState(
      // A filename
      path.resolve(__dirname, './state.proto'),
      // Your protobuf package name
      'testgame',
      // [OPTIONAL] An initial game state
      {
        currentPlayerId: "player-1",
        currentPlayerRolCount: 0
      }
    )
    .run()
  ```

* **Authentication**

  Authentication is handled via middleware. It is not recommended to 
  write a custom authentication method. EcmaserveGames/host expects 
  the middleware context to supply the identified user as an object at
  `<middleware_context>.state.user`.

  If you are using Bearer tokens, it is recommended to use
  `koa-jwt` since the host is built using [koa](https://koajs.com/)'s 
  middleware server.

  ```js
  /// index.js
  const { GameServer } = require('<TBD>')
  const jwt = require('koa-jwt)

  const game = new GameServer()
  game
    .useAuthentication(jwt({ secret: '<JWT_SECRET_KEY>' }))
    .run()
  ```


* **Actions**

  Actions are the trigger for updating game state. There are not
  pre-defined actions so you are free to create your own Actions 
  defintion.

  Like Game State, Protocol Buffers are the supported means of 
  defining your game's actions.

  However, to properly route rules and game mechanics, Actions 
  definition must be in the following well-known structure.

  ```proto
  /// actions.proto

  package testgame;
  syntax = "proto3";

  message Actions {
    oneof Action {
      ... /// any keyed messages that become your action set
    }
  }
  ```

  Loading the `Actions` message is done as part of the host's builder 
  pattern. You will need to supply a `filename` and `packageName`.

  ```js
  /// index.js
  const { GameServer } = require('<TBD>')
  const path = require('path')

  const game = new GameServer()
    .useActions(
      // A filename
      path.resolve(__dirname, './actions.proto'),
      // Your protobuf package name
      'testgame',
    )
    .run()
  ```

* **Mechanics**

  Mechanics are methods that _manipulate_ game state when an
  action is triggered. They are not evaluated if the rules 
  cannot be validated. They also do not require a return
  and can perform async operations.

  ```js
  // CustomGameMechanic.js
  const { Mechanic } = require('<TBD>')

  const DoFoo = Mechanic
    .create('do_foo')
    .forActions('foo')
    .use(
      ({ 
        actions, // 📩 The Actions Message received
        gameState // 🎲 The GameState
      }) => { 
        /// 🦠 Have fun mutating your gameState freely!
      })

  modules.exports = {
    DoFoo
  }
  ```

  They are added to the game host like such:

  ```js
  /// index.js
  const { GameServer } = require('<TBD>')
  const { DoFoo } = require('./CustomGameMechanic')

  const game = new GameServer()
    .useMechanics(DoFoo)
    .run()
  ```

* **Rules**

  Rules are methods that can validate if an action should
  be _allowed_ and may _manipulate_ the game state if that action
  is allowed.

  These are the real guts of the application and offer a great
  deal of flexibility.

  ```js
  // GoldenRule.js
  const { Rule } = require('<TBD>')

  const GoldenRule = Rule
    .create('golden')
    .forActions('doOntoOther')
    .use(
      ({ 
        actions, // 📩 The Actions Message received
        gameState, // 🎲 The current/unmutated GameState
        ruleResults, // 🧪 The results of previousl evaluated rules
        mutate, // 🦠 Register a mutation if the rules pass
        exeptionTo, // 🔀 A callback to remove another rule validation
                    // result. Keep in mind that the order of 
                    // adding rules is the order of rule evaluation.
        user // 👤 The user provided from authentication middleware
      }) => { 
        
      })

  modules.exports = {
    GoldenRule
  }
  ```

  Rules are added to the game host like such:

  ```js
  /// index.js
  const { GameServer } = require('<TBD>')
  const { GoldenRule } = require('./GoldenRule')

  const game = new GameServer()
    .useRules(GoldenRule)
    .run()
  ```
* **Game State Masks**

  Game state masks allow you to selectively hide parts
  of the game state to a connected participant. They 
  are applied to each individual participant after
  a game state update has been triggered by an action
  and are not persisted in any way.

  ```js
  // PlayerHand.js

  const hideOtherPlayerHands = 
    ({ 
      user, // 👤 The participant provided from authentication middleware
      mutate // 🦠 A callback to reveal the game state being sent to a participant
    }) => {
      mutate(state => {
        state.playerHands = state.playerHands.filter(
          hand => {
            return hand.playerId === user.playerId
          })
      })
    }

  modules.exports = {
    hideOtherPlayerHands
  }
  ```

  Game State masks are added to the game host like such:

  ```js
  /// index.js
  const { GameServer } = require('<TBD>')
  const { hideOtherPlayerHands } = require('./PlayerHand')

  const game = new GameServer()
    .useStateMask(hideOtherPlayerHands)
    .run()
  ```

