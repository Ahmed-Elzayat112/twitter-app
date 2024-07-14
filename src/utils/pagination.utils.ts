import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
): Promise<{ items: T[]; totalCount: number; totalPages: number }> {
  const [items, totalCount] = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  const totalPages = Math.ceil(totalCount / limit);

  return { items, totalCount, totalPages };
}
