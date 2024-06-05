export const createRestaurantReq = (
    name: string,
    isKosher: boolean,
    cuisines: string[]
) => {
    return {
        name,
        isKosher,
        cuisines,
    };
};
