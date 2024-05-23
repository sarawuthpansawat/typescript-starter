import * as _ from 'lodash';
export function SuccessResponse(data): object {
  const result = {
    status_code: 200,
    data: null,
  };
  if (!_.isEmpty(data)) result.data = data;
  if (typeof data == 'number' || typeof data == 'boolean') result.data = data;
  return result;
}

export function ErrorResponse(message): object {
  const result: any = {
    status_code: 400,
    error: 'Bad Request',
  };
  if (message) result.message = message;
  return result;
}

export function UnauthorizedReponse(message): object {
  const result: any = {
    status_code: 401,
    error: 'Unauthorized',
  };
  if (message) result.message = message;
  return result;
}

export async function paginate(
  allItems: any,
  l: any = '5000',
  p: any = '1',
): Promise<any> {
  const limit = parseInt(l);
  const page = parseInt(p);
  const allItems2d = [];
  let count = 0;
  _.filter(allItems, (item, itemIndex: any) => {
    if (itemIndex > 0 && itemIndex % limit == 0) count++;
    if (!allItems2d[count]) allItems2d[count] = [];
    allItems2d[count].push(item);
  });
  const result = {
    items: [],
    meta: {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: limit,
      totalPages: 1,
      currentPage: page,
    },
  };
  try {
    result.meta.totalItems = _.size(allItems);
    result.items = allItems2d[page - 1];
    result.meta.itemCount = _.size(allItems2d[page - 1]);
    result.meta.totalPages = _.size(allItems2d);
  } catch (err) {}
  return result;
}
