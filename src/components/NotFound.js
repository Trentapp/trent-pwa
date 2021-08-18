import React from "react";
import { useTranslation } from 'react-i18next';

const NotFound = props => {
    const {t, i18n} = useTranslation();

    return(
        <div className="not-found">
            <h1>{t("404")}</h1>
            <h2>{t("Not found")}</h2>
        </div>
    )
}

export default NotFound;
