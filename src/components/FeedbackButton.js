import { QuestionIcon } from '@chakra-ui/icons'
import { Popover, IconButton, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function FeedbackButton() {
    const {t} = useTranslation();

    const mainButtonStyles = {
        position: "fixed",
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
            <>{t('feedback.HearFromYou')}</><a href="mailto:support@trentapp.com">support@trentapp.com</a>
        </PopoverContent>
    </Popover>
    )
}
