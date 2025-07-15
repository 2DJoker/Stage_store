import { Api } from "@/services/api-client";
import { Brand } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

type BrandItem = Pick<Brand, 'id' | 'name'>;

interface ReturnProps {
    items: BrandItem[];
    selectedIds: Set<string>;
    onAddID: (id: string) => void;
}

export const useFilterBrands = (ids: string[] = []): ReturnProps => {
    const [items, setItems] = React.useState<BrandItem[]>([]);

    // Создаем из массива ids Set и передаем его в useSet
    const [selectedIds, { toggle }] = useSet(new Set(ids));

    React.useEffect(() => {
        async function fetchBrands() {
            try {
                const brands = await Api.brands.getAll();
                setItems(brands.map(brand => ({ id: brand.id, name: brand.name })));
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        }
        fetchBrands();
    }, []);

    React.useEffect(() => {
        // Если ids изменились, обновим selectedIds (пересоздадим Set)
        // Важно: useSet из react-use не предоставляет метод для сброса, 
        // поэтому можно обойтись вызовом toggle для добавления новых id, 
        // но проще просто сделать новый Set в useSet
        // Либо можно игнорировать изменения ids после монтирования, если они не меняются.
    }, [ids]);

    return { items, selectedIds, onAddID: toggle };
};
