import {Button} from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilters from "@/components/filters/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
    {
        _id: "1", title: "How to learn React?",
        description: "I want to learn React, can anyone help me?",
        tags: [
            {_id: "1", name: "React"},
            {_id: "2", name: "Javascript"},
        ],
        author: {_id: "1", name: "John Doe", image:"https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"},
        upvotes: 10,
        answers: 5,
        views: 100,
        createdAt: new Date()
    },
    {
        _id: "2", title: "How to learn Javascript?",
        description: "I want to learn React, can anyone help me?",
        tags: [
            {_id: "1", name: "Javascript"},
            {_id: "2", name: "React"},
        ],
        author: {_id: "1", name: "John Doe", image:"https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"},
        upvotes: 10,
        answers: 5,
        views: 100,
        createdAt: new Date()
    },
]

interface SearchParams {
    searchParams: Promise<{ [key: string]: string }>
}

const Home = async ({searchParams}: SearchParams) => {
    const {query = "", filter = ""} = await searchParams;

    const filteredQuestions = questions.filter((question) => {
        // Match query against the title
        const matchesQuery = question.title
            .toLowerCase()
            .includes(query.toLowerCase());

        // Match filter against tags or author name, adjust logic as needed
        const matchesFilter = filter
            ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
            : true; // If no filter is provided, include all questions

        return matchesQuery && matchesFilter;
    });

    return (
        <>
            <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
                <h1 className="h1-bold text-dark-100_light900">All Questions</h1>
                <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
                    <Link href={ROUTES.ASK_QUESTION}>
                        Ask a Question
                    </Link>
                </Button>
            </section>
            <section className="mt-11">
                <LocalSearch route='/'
                             imgSrc='/icons/search.svg'
                             placeholder='Search questions...'
                             otherClasses='flex-1'
                />
            </section>
            <HomeFilters/>
            <div className="mt-10 flex w-full flex-col gap-6">
                {filteredQuestions.map((question) => (
                    <QuestionCard key={question._id} question={question}/>
                ))}
            </div>
        </>
    )
}

export default Home;