import { defineStore } from 'pinia'

type RootState = {
  searchText: string
}

export const useSearchStore = defineStore('search', {
  state: () =>
    ({
      searchText: '',
    } as RootState),
})
