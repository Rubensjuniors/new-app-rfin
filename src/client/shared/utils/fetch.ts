interface FetchApiOptions<T = unknown> {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: T
}

export async function fetchApi<T = unknown>({
  path,
  method = 'GET',
  data
}: FetchApiOptions<T>): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data)
  }

  return await fetch(`/api/${path}`, options)
}
