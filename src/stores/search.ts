import { defineStore } from 'pinia'

type RootState = {
  searchText: string
  searchDate: Date[]
}

export const useSearchStore = defineStore('search', {
  state: () =>
    ({
      searchText: '',
      searchDate: [new Date(), new Date()],
    } as RootState),
})
