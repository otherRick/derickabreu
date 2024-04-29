# Configuração de Testes e Desenvolvimento com React, Jest, Storybook e MSW

##### Service Worker

Service workers atuam como servidores proxy entre aplicações web, o navegador e a rede (quando disponível). Eles são projetados, entre outras coisas, para permitir a criação de experiências offline eficazes, interceptar solicitações de rede e tomar medidas apropriadas com base na disponibilidade da rede, e atualizar ativos residentes no servidor. Eles também permitem acesso a notificações push e APIs de sincronização em segundo plano.

##### Jest

[Jest](https://jestjs.io/pt-BR/) é um framework de teste.

##### Storybook

[Storybook](https://storybook.js.org/) é um framework de documentação.

##### @testing-library/react

[Esta é](https://testing-library.com/docs/react-testing-library/intro/) uma biblioteca para ajudar a testar frameworks/libs de UI como o React.

##### @testing-library/jest-dom

[Esta é](https://testing-library.com/docs/ecosystem-jest-dom/) biblioteca adiciona "matchers" ao expect que facilitam o teste de componentes de UI, como isDisabled, toBeInDocument.

##### Fixes

- > dentity-obj-proxy : Conserta as importações e o uso de CSS nos arquivos a serem testados, basicamente mockando/alterando as importações com o que o identity-obj-proxy fornece.

- > jest-environment-jsdom: Fornece ao Jest um ambiente "DOM", permitindo que o Jest execute em um ambiente semelhante a um navegador.

- > jest-transformer-svg: Realiza a mesma função que o identity-obj-proxy, mas normalmente usado para transformar arquivos SVG.

- > ts-jest: Um "transformer" com suporte para "source map" que faz o Jest entender TypeScript, import, entre outras coisas.

- > ts-node: Permite escrever arquivos de configuração em TypeScript na raiz do projeto, como o jest.config.ts.

### Linkers

##### @swc/jest

Liga o Jest com o service worker.

##### msw-storybook-addon

Liga o Storybook com o service worker.

## Configurações

#### Jest

`npm install --save-dev jest jest-environment-jsdom ts-node ts-jest`

Crie um arquivo na raiz do projeto: `jest.config.ts`

```
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
}
```

isso é o basico para conseguir rodar o jest usando typescript com syntax moderna como import e tal. Mas o react ainda n vai funcionar.
da pra criar um arquivo qualquercoisa.test.ts e fazer algum test para testar.

## Configurar jest + testing library

`npm install --save-dev @testing-library/react @types/react-dom`

agora com essa lib eh possivel testar usando algo como:

```
import { render } from "@testing-library/react"

test("should test", () => {
  render(<MyComponent />)
  ...
})
```

Se "MyComponent" usar arquivos como css ou svg, ai vai precisar usar [jest-transformer-svg]('https://www.npmjs.com/package/jest-transformer-svg) e [identity-obj-proxy]('https://www.npmjs.com/package/identity-obj-proxy).

`npm install --save-dev jest-transformer-svg identity-obj-proxy`

Então vai precisar mexer na config do jest para ele usar essas libs.

O arquivo _jest.config.ts_ vai ficar assim:

```
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // trata os arquivos css,less,sass e scss com a lib identity-obj-proxy
    '^.+\\.svg$': 'jest-transformer-svg' // trata o arquivo csv com a lib jest-transformer-svg
  }
};
```

Feito isso, ai se o "MyComponent" tiver um arquivo css ou csv, nao é pra dar nenhum erro.

#### Adicionando matchers extras para o expect()

`npm install --save-dev @testing-library/jest-dom`

criar um arquivo `jest.setup.ts` na root do projeto assim:

```
import '@testing-library/jest-dom';
```

Basicamente esse arquivo eh lido pelo jest antes de rodar os testes. E o requerimento da lib jest-dom eh ser importado dessa maneira antes de ser usado.

precisa tambem incluir no arquivo `tsconfig.json` na root do projeto essa config:
_"include": ["src", "./jest.setup.ts"]_

Um exemplo:

```
{
  "compilerOptions": {
   ...
  },
  "include": ["src", "./jest.setup.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Feito isso, eh para estar tudo ok.

## Configurar storybook

`npx storybook@latest init`

Isso cria toda a config basica do storybook e meio que ja ta pronto para ser usado.

## Configurar msw - mock service worker

`npm install msw@latest --save-dev`
`npx msw init /public`
Obs.: _Esse comando nao funcionou no yarn provavel por causa da versao 1.x.x_

Criar um arquivo em um lugar por exemplo: `src/mock/handlers.ts`

```
import { setupServer } from 'msw/node' // para o jest, depois
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]

// idealmente eh melhor ter um arquivo separado para isso como por exemplo: src/mock/server.ts
export const server = setupServer(...handlers) // para o jest, depois
```

#### [Fix]('https://mswjs.io/docs/migrations/1.x-to-2.x/#frequent-issues) do msw

Por causa da versao 2.0 e por causa do jest e tal

`npm install "undici": "^5.26.2"` (acho que pode ser --save-dev)

criar arquivo `jest.polyfills.js` na root:

```
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const { TextDecoder, TextEncoder, ReadableStream } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream }
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response }
});
```

modificar arquivo `jest.config.js`:

```
module.exports = {
  // ... outros codigos acima
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
}
```

## [Service ]('https://storybook.js.org/addons/msw-storybook-addon')worker + storybook

`npm install --save-dev msw-storybook-addon`

atualizar o aquivo: `./storybook/preview.js`

```
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass' // ignore unhandled requests.
})

const preview = {
  // other codes
  // Provide the MSW addon loader globally
  loaders: [mswLoader, /* other loaders */],
}

export default preview
```

Feito isso, eh para o msw funcionar no storybook.
ai da pra criar um arquivo `.stories.tsx` e testar.

Exemplo de um arquivo:

```
import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';
import { ProductListProvider } from '../../contexts/ProductListContext/ProductListContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handlers } from '../../mocks/handlers';
import { HttpResponse, delay, http } from 'msw';

type Story = StoryObj<typeof Meta>;

/**
 * Meta: the main component to be rendered. I.e.: Dashboard
 * must be default export
 */
const Meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
  /**
   * a function that will take place over the component itself.
   */
  decorators: (Story) => (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: 0
            }
          }
        })
      }
    >
      <ProductListProvider>
        <Story />
      </ProductListProvider>
    </QueryClientProvider>
  )
};

/**
 * Each export will be a state for the meta component
 */
export const Default: Story = {
  parameters: {
    msw: {
      handlers
    }
  }
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://example.com/user',
          async () => {
            await delay('infinite');
          }
        )
      ]
    }
  }
};
```

## Storybook + msw + jest link

linkar jest com msw:

`npm install --save-dev @swc/core @swc/jest`

atualizar arquivo `jest.config.ts`:

```
const config = {
  // outras configs
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
};
```

Atualizar arquivo `jest.setup.ts`:

```
import '@testing-library/jest-dom';
import { server } from './src/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

Com isso, eh para o msw funcionar no jest.
linkar jest com storybook:

O composeStories ja faz isso e ele vem de uma lib ja instalada: `@storybook/react`.
Então é so seguir direto com o teste. Exemplo:

```
import { render, screen } from '@testing-library/react';
import * as stories from './Dashboard.stories';
import { composeStories } from '@storybook/react';

const { Loading, Error, Empty, Success } = composeStories(stories);

test('loading', () => {
  server.use(...Loading.parameters.msw.handlers);

  render(<Loading />);

  const loadingText = screen.getByText(/Loading products.../i);

  expect(loadingText).toBeInTheDocument();
});

test('error', async () => {
  server.use(...Error.parameters.msw.handlers);

  render(<Error />);

  const foundText = await screen.findByText(
    /Error fetching products: Request failed with status code 500/i
  );

  expect(foundText).toBeInTheDocument();
});
```

exemplo de arquivos de config finalizados:

`jest.config.ts`:

```
import type { Config } from 'jest';

const config: Config = {
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic'
            }
          }
        }
      }
    ]
  },
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFiles: ['./jest.polyfills.js'],
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '/.storybook/',
    'src/vite-env.d.ts',
    '\\.stories.(js|jsx|ts|tsx)$',
    'src/mocks/',
    'src/routes/'
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg'
  }
};

export default config;
```

jest.polyfills.js:

```
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// jest.polyfills.js
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

const { TextDecoder, TextEncoder, ReadableStream } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream }
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response }
});
```

jest.setup.ts:

```
import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
```

tsconfig.json:

```
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ES2020",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "./jest.setup.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

.storybook/main.ts:

```
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
```

.storybook/preview.ts:

```
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize({
  onUnhandledRequest: 'bypass'
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  loaders: [mswLoader]
};

export default preview;
```

referencia de um arquivo package.json, porem as versoes e tal pode mudar com o tempo:

```
{
  "name": "mksstore",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "start": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.32.0",
    "@types/react-query": "^1.2.9",
    "axios": "^1.6.8",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.23.0",
    "undici": "^5.26.2"
  },
  "devDependencies": {
    "@chromatic-com/storybook": "^1.3.3",
    "@storybook/addon-essentials": "^8.0.9",
    "@storybook/addon-interactions": "^8.0.9",
    "@storybook/addon-links": "^8.0.9",
    "@storybook/addon-onboarding": "^8.0.9",
    "@storybook/blocks": "^8.0.9",
    "@storybook/react": "^8.0.9",
    "@storybook/react-vite": "^8.0.9",
    "@storybook/test": "^8.0.9",
    "@swc/core": "^1.5.0",
    "@swc/jest": "^0.2.36",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^15.0.4",
    "@types/jest": "^29.5.12",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.25",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "eslint-plugin-storybook": "^0.8.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-transformer-svg": "^2.0.2",
    "msw": "^2.2.14",
    "msw-storybook-addon": "^2.0.0",
    "sass": "^1.75.0",
    "storybook": "^8.0.9",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5",
    "vite": "^5.2.0"
  },
  "msw": {
    "workerDirectory": [
      "public"
    ]
  }
}
```
