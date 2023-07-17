interface MyStorage extends Storage {
  state: {
    [key: string]: unknown | null;
  };
}

const localStorages: MyStorage = {
  state: {},
  setItem(key: string, item: any): void {
    this.state[key] = item;
  },
  getItem(key: string): any | null {
    return this.state[key] || null;
  },
  length: 0,
  clear: function (): void {
    throw new Error('Function not implemented.');
  },
  key: function (): string | null {
    throw new Error('Function not implemented.');
  },
  removeItem: function (): void {
    throw new Error('Function not implemented.');
  }
};

global.localStorage = localStorages;

// browser mocks

// interface MyStorage extends Storage {
//   getItem(key: string): any | null;
//   setItem(key: string, value: any): void;
//   removeItem(key: string): void;
//   clear(): void;
// }

// const localStorageMock: MyStorage = (function () {
//   let store: { [key: string]: any } = {};

//   return {
//     getItem: function (key: string): any | null {
//       return store[key] || null;
//     },
//     setItem: function (key: string, value: any): void {
//       store[key] = value.toString();
//     },
//     removeItem: function (key: string): void {
//       delete store[key];
//     },
//     clear: function (): void {
//       store = {};
//     },
//     length: 0, // Additional property to match Storage interface
//     key: jest.fn(), // Additional property to match Storage interface
//   };
// })();

// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock,
// })