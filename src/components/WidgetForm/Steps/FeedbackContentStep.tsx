import { FormEvent, useState } from "react";
import { ArrowLeft } from "phosphor-react";

import { api } from "../../../libs/api";

import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSend: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackSend,
    onFeedbackRestartRequested
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [isSendFeedback, setIsSendingFeedback] = useState(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false);
        onFeedbackSend();
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.imagem.source} alt={feedbackTypeInfo.imagem.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form className="my-4 w-full" onSubmit={event => handleSubmitFeedback(event)}>
                <textarea
                    className="w-[360px] min-w-full max-w-[70vw] min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}