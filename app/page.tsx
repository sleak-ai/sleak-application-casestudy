import { SiteHeader } from '@/components/site-header'

export default function Home() {
    return (
        <>
            <SiteHeader breadcrumbs={[{ title: 'Home', link: '/' }]} />
            <main className="@container/main flex flex-1 flex-col gap-2">
                <div className="px-4 py-4 md:py-6 lg:px-6">
                    {/* Main Content Section */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-muted h-52 w-full rounded-lg"></div>
                        ))}
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-muted h-52 w-full rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}
