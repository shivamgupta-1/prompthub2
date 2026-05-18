import React from 'react';
import ServiceCategory from './ServiceCategory';
import { useGetDashboardQuery } from '../../redux/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Summary from './Summary';

interface ServiceType {
  id: number;
  name: string;
  url: string;
  status: string;
}

interface ServiceCategoryType {
  categoryId: string | number;
  categoryName: string;
  categoryDescription: string;
  services: ServiceType[];
}

const Dashboard: React.FC = () => {
  const { data, isFetching, error } = useGetDashboardQuery(undefined, {
    pollingInterval: 10_000,
    refetchOnFocus: true,
  });

  const [generatedCategories, setGeneratedCategories] = useState<ServiceCategoryType[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // categoryName -> { categoryId, services }
    const categoryMap = new Map<
      string,
      {
        categoryId: number | string;
        services: ServiceType[];
      }
    >();

    data.forEach((item, i) => {
      const categoryName = item.applicationName ?? 'Uncategorized';
      const categoryId = item.applicationId ?? `${100 - i}`;
      const service: ServiceType = {
        id: item.id,
        name: item.tile, // tile -> service name
        url: item.baseUrl, // baseUrl -> service url
        status: item.status ?? '200',
      };

      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          categoryId,
          services: [service],
        });
      } else {
        categoryMap.get(categoryName)!.services.push(service);
      }
    });

    // Convert Map to required array structure
    const categories: ServiceCategoryType[] = Array.from(categoryMap.entries()).map(
      ([categoryName, value]) => ({
        categoryName,
        categoryId: value.categoryId,
        services: value.services,
      }),
    );

    setGeneratedCategories(categories);
  }, [data]);
  console.log("Generated categories", error, isFetching);
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='flex items-center justify-between p-4'></div>
      <div className='py-6'>
        <div className='mx-auto px-4'>
          <div className='rounded-3xl bg-white justify-content   p-4 shadow-md border border-slate-200 -mt-8 ring-1 ring-slate-50 relative z-10'>
            <div className='flex flex-col gap-4'>
              <main className='pb-12'>
                <div className='mx-auto'>
                  {!isFetching && Object.keys(error || {}).length == 0 ? (
                                        // Data loaded state

                    <div className='grid grid-cols-1 xl:grid-cols-6 gap-2.5 max-w-fit mx-auto'>
                    <div className="col-span-5 flex grid grid-cols-1 xl:grid-cols-5 gap-2.5">
  {generatedCategories?.map((category, index) => (
    <ServiceCategory
      key={category.categoryId}
      category={category}
      startServiceNumber={
        index === 0
          ? 1
          : generatedCategories
              .slice(0, index)
              .reduce((sum, cat) => sum + cat.services.length, 1)
      }
    />
  ))}
</div>
                      <div className='col-span-1'>
                                                <Summary serviceCategories={generatedCategories} />
                      </div>
                    </div>

                  ) : (
                                        // Loading Skeleton UI
                    <div className='grid grid-cols-1 xl:grid-cols-6 gap-2.5 max-w-fit mx-auto'>
                      {' '}
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className='flex flex-col gap-3 animate-pulse'>
                          {/* Skeleton category header */}
                          <div className='h-5 bg-slate-200 rounded w-24' />
                          {/* Skeleton cards */}
                          {Array.from({ length: 4 }).map((_, cardIdx) => (
                            <div
                              key={cardIdx}
                              className='w-full h-24 bg-slate-100 rounded-lg border border-slate-200'
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </main>

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
