interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <span key={item.label}>
                    {item.href ? (
                        <a href={item.href}>{item.label}</a>
                    ) : (
                        <span aria-current="page">{item.label}</span>
                    )}
                    {index < items.length - 1 && <span aria-hidden="true"> › </span>}
                </span>
            ))}
        </nav>
    );
}
