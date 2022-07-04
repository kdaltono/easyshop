import React from "react";
import { useSearchParams } from "react-router-dom";

export function MealViewer() {
    let [searchParams, setSearchParams] = useSearchParams();
    
    const mealId = searchParams.get("mealid")

    return (
        <div>   
            Meal ID: {mealId}
        </div>
    )
}