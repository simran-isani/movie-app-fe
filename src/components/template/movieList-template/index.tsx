import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import MovieCard from "@/components/organisms/movie-card";
import { Pagination } from "@/components/molecules/pagination";
import { EmptyMessageTemplate } from "../emty-template";
import { ACCESS_TOKEN } from "@/static-data/common-roles";

export const MovieListTemplate = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const fetchMovies = async (page: any) => {
    setLoading(true);
    const token = localStorage.getItem(ACCESS_TOKEN);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/movies?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.data.data);
      setTotalPages(data.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-secondary py-[120px] login-wrapper">
      <div className="container">
        <div className="flex justify-between">
          <h3
            className="flex gap-3 text-5xl leading-[56px] font-semibold text-white items-center cursor-pointer"
            onClick={() => {
              router.push("/create-movie");
            }}
          >
            My movies <IoMdAddCircleOutline size={26} />
          </h3>
          <h3
            className="flex gap-3 text-base leading-6 font-bold text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout <LuLogOut size={24} />
          </h3>
        </div>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <>
            {movies?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-[120px]">
                  {movies.map((movie: any, index) => (
                    <MovieCard
                      key={index}
                      link={`/movies/${movie._id}`}
                      title={movie.title}
                      year={new Date(movie.publisherYear).getFullYear()}
                      imageUrl={
                        movie.image
                          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.image}`
                          : ""
                      }
                    />
                  ))}
                </div>
                <div className="mt-[120px]">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            ) : (
              <EmptyMessageTemplate />
            )}
          </>
        )}
      </div>
    </div>
  );
};
