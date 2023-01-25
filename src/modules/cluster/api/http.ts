import axios from '@/axios'

export function useHttpCluster() {
  const readAll = async () => {
    const result = await axios.get('/clusters')
    return {
      clusters: result.data.data,
    }
  }
  return {
    readAll,
  }
}
