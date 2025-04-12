export interface PaginationFilterRequestDto {
    page?: number;
    take?: number;
    order?: string;
    sortBy?: string;
    filter?: string;
    filterBy?: string;
}