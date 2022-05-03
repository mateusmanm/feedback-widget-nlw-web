import { ChatTeardropDots } from "phosphor-react";
import { Popover } from '@headlessui/react';

export function Widget() {
    return (
        <div>
            <Popover className="absolute bottom-6 right-6">
                <Popover.Panel>
                    Hello Word
                </Popover.Panel>

                <Popover.Button className="bg-brand-500 px-4 h-16 rounded-full text-white flex items-center group">
                    <ChatTeardropDots className="w-8 h-8" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                        <span className="ml-2">
                            Feedback
                        </span>
                    </span>
                </Popover.Button>
            </Popover>
        </div>
    )
}