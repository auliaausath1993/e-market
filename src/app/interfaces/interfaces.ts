export interface Product {
    title: string;
    subtitle: string;
    image: string;
    price: number;
    inCart: boolean;
}

export interface ProductGroup {
    image: string;
    group: string;
    color: string;
}

export interface ProductCategory {
    image: string;
    category: string;
    color: string;
}

export interface CartItem {
    title: string;
    subtitle: string;
    image: string;
    price: number;
    quantity: number;
}

