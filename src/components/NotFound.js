import React from "react";
import { useTranslation } from 'react-i18next';

const NotFound = props => {
    const {t} = useTranslation();

    return(
        <div className="not-found">
            <h1>{t("NotFound.404")}</h1>
            <h2>{t("NotFound.Not found")}</h2>
        </div>
    )
}

export default NotFound;
