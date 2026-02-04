import { listCategoriesController } from '@/server/controller/Category/ListCategoriesController'

export async function GET() {
  return listCategoriesController()
}
