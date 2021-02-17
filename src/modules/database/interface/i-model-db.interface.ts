export interface IModelDbService<T, dtoT> {
    
    getAll(): Promise<T[]>;
    
    getOne(id: string): Promise<T>;

    update(id: string, entity: dtoT);

    remove(id: string);

    insert(entity: dtoT): Promise<T>;
}
