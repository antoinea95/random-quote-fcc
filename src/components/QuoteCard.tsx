import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import { z } from "zod";
import './quote.css';
import { useEffect, useState } from "react";

export const QuoteCard = () => {

    const [getNewQuote, setGetNewQuote] = useState(true);

    const Quote =  z.array(
        z.object({
            quote: z.string(),
            category: z.string(),
            author: z.string()
        })
    );

    type QuoteType = z.infer<typeof Quote >;

    const getRandomQuotes = async (): Promise<QuoteType> => {
            const res = await fetch(
            'https://api.api-ninjas.com/v1/quotes', 
            { headers: {'X-Api-Key': "37VY8BF6n0W7fuiQow1TbA==r2ExdXcWlKLSywAD"}
            });
            return res.json();
    }

    const {data, isPending, isError, isSuccess, refetch, error} = useQuery({
        queryKey: ["quote"],
        queryFn: getRandomQuotes,
        enabled: getNewQuote,
    })

    useEffect(() => {
        if(isSuccess) setGetNewQuote(false);
      }, [isSuccess])

    if (isPending) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }

    return (
        <article id="quote-box">
                {data.map(quote => (
                <section id="quote-box_content" key={quote.author}>
                     <h1 id="text">{quote.quote}</h1>
                     <p id="author">{quote.author}</p>
                </section>
                ))}
               
            <section id="quote-box_footer">
                <button id="new-quote" onClick={() => refetch()}> New quote</button>
                {data.map(quote => (
                <a id="tweet-quote" target="_blank" rel="canonical" href={`https://twitter.com/intent/tweet?text=${quote.quote}&hashtags=${quote.author}`}>
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                 ))}
            </section>
        </article>
    )
}