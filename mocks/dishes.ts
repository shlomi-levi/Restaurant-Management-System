export const createDishReq = (name: string, description: string, price: number) => {
    return {
        name,
        description,
        price,
    };
};
