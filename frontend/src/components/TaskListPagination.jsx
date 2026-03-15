import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function TaskListPagination({ handleNext, handlePrev, totalPages, page }) {
    if (totalPages <= 1) return null // ẩn nếu chỉ có 1 trang

    return (
        <Pagination>
            <PaginationContent>
                {/* Nút Prev */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={page > 1 ? handlePrev : undefined}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>

                {/* Số trang động */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            isActive={p === page}
                            className="cursor-pointer"
                            onClick={() => {
                                if (p > page) handleNext()
                                else if (p < page) handlePrev()
                            }}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Nút Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={page < totalPages ? handleNext : undefined}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}