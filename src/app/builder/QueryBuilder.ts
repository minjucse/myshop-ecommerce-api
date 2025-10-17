import { FindOptions, WhereOptions, Model, ModelStatic, Op } from 'sequelize';

interface QueryOptions {
  searchTerm?: string;
  sort?: string;
  limit?: number;
  page?: number;
  fields?: string;
  [key: string]: any;
}

class QueryBuilder<T extends Model> {
  public model: ModelStatic<T>;
  public query: QueryOptions;
  public options: FindOptions = {};

  constructor(model: ModelStatic<T>, query: QueryOptions) {
    this.model = model;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const { searchTerm } = this.query;
    if (searchTerm) {
      this.options.where = {
        ...this.options.where,
        [Op.or]: searchableFields.map((field) => ({
          [field]: { [Op.iLike]: `%${searchTerm}%` },
        })),
      };
    }
    return this;
  }

  filter() {
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    const queryFilters = { ...this.query };

    excludeFields.forEach((field) => delete queryFilters[field]);

    this.options.where = {
      ...(this.options.where as WhereOptions),
      ...queryFilters,
    };

    return this;
  }

  sort() {
    const { sort } = this.query;
    if (sort) {
      this.options.order = sort.split(',').map((field) => {
        const direction = field.startsWith('-') ? 'DESC' : 'ASC';
        return [field.replace('-', ''), direction];
      });
    } else {
      this.options.order = [['createdAt', 'DESC']];
    }
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const offset = (page - 1) * limit;

    this.options.limit = limit;
    this.options.offset = offset;

    return this;
  }

  fields() {
    const { fields } = this.query;
    if (fields) {
      this.options.attributes = fields.split(',');
    }
    return this;
  }

  async execute() {
    const results = await this.model.findAll(this.options);
    const total = await this.model.count({
      where: this.options.where,
    });

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      data: results,
    };
  }
}

export default QueryBuilder;
