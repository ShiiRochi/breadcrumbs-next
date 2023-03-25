import NextBreadcrumbs, { createNextCrumbComponent } from "breadcrumbs-next";

const Crumb = createNextCrumbComponent(({ children }) => {
    return <span>{children}</span>;
});

export default function ItemsSlug () {
    return (
        <>
            <NextBreadcrumbs
                Container="nav"
                Crumb={Crumb}
            />
            ItemsSlug Path
        </>
    );
};
