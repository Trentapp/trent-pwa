import { QuestionIcon } from '@chakra-ui/icons'
import { Popover, IconButton, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { Fab } from 'react-tiny-fab'

export default function FeedbackButton() {
    const mainButtonStyles = {
        position: "absolute",
        bottom: "20px",
        right: "20px",
    }

    return (
    <Popover placement="top">
        <PopoverTrigger>
            <IconButton variant="outline" style={mainButtonStyles} icon={<QuestionIcon />}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverCloseButton />
            {t('feedback.Hi, if you have problems or feedback, we would love to hear from you: ')}<a href="mailto:support@trentapp.com">support@trentapp.com</a>
        </PopoverContent>
    </Popover>
    )
}
