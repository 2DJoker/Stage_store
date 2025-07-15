'use client'

import React from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterBrands } from "@/hooks/useFilterBrands";
import { useSet } from "react-use";
import qs from 'qs'
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    className?: string; 
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    popular: string;
    items: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const router = useRouter();

    const initialItems = searchParams.get('items')?.split(',') ?? [];

    const { items, onAddID, selectedIds } = useFilterBrands(initialItems);

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const [popular, { toggle: togglePopular }] = useSet(new Set<string>(
        searchParams.has('popular') ? searchParams.get('popular')?.split(',') : []
    ));

    const brandCheckboxItems = items.map(item => ({
        value: String(item.id),
        text: item.name,
    }));

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    React.useEffect(() => {
        const filters = {
            ...prices,
            popular: Array.from(popular),
            items: Array.from(selectedIds),
        };

        const query = qs.stringify(filters, {
            arrayFormat: 'comma',
            skipNulls: true,
        });

        router.push(`?${query}`, { scroll: false });
    }, [prices, popular, selectedIds, router]);

    return (
        <div className={className}>
            <Title text='Фильтрация' size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                title=""
                name="filters"
                className="mb-5"
                onClickCheckbox={togglePopular}
                selectedIds={popular} // Set<string>
                items={[
                    { text: 'Новинки', value: 'new' },
                    { text: 'Скидки', value: 'sale' },
                    { text: 'Популярное', value: 'popular' },
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={30000}
                        value={prices.priceFrom !== undefined ? String(prices.priceFrom) : ''}
                        onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={0}
                        max={30000}
                        placeholder="30000"
                        value={prices.priceTo !== undefined ? String(prices.priceTo) : ''}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={30000}
                    step={100}
                    value={[prices.priceFrom ?? 0, prices.priceTo ?? 30000]}
                    onValueChange={([priceFrom, priceTo]) => setPrices({ priceFrom, priceTo })}
                />
            </div>

            <CheckboxFiltersGroup
                title="Бренды"
                className="mt-5"
                limit={6}
                defaultItems={brandCheckboxItems.slice(0, 6)}
                items={brandCheckboxItems}
                onClickCheckbox={onAddID}
                selectedIds={selectedIds} // Set<string>
            />
        </div>
    );
};
