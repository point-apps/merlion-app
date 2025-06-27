import { defineStore } from 'pinia'

type RootState = {
  searchText: string
  searchDate: Date[]
  createdBy: string | null
  appliedCreatedBy: string | null
}

export const useSearchStore = defineStore('search', {
  state: () =>
    ({
      appliedCreatedBy: '',
      createdBy: '',
      searchText: '',
      searchDate: [new Date(), new Date()],
    } as RootState),
})
