import { Container } from "@/components/shared/container";
import { GroupVariants } from "@/components/shared/group-variant";
import { ProductImage } from "@/components/shared/productimage";
import { Title } from "@/components/shared/title";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({params: { id } }: { params: {id: string } }) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) }});

    if  (!product) {
        return notFound()
    }   


    return (
        
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
            <ProductImage imageUrl={product.imageUrl} size={90} />
            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={product.name} size="md" className="font-extrabold mb-3" />
                    <p className="text-gray-400 mb-6">писюнички обувь любит пилы</p>
                    <p className="text-green-600 font-medium mb-4">В наличии</p>

                    <GroupVariants 
                    selectedValue="2"
                    items={[
                        {
                            name: "черный",
                            value: '1',
                        },
                        {
                            name: 'белый',
                            value: '2',
                        },
                        {
                            name: 'серый',
                            value: '3',
                            disabled: true
                        },
                    
                    ]} 
                    
                    />

            </div>
        </div>
        </Container>
    )
   
}