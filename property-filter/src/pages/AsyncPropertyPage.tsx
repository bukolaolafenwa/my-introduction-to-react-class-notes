// STEP 1: import useState, useEffect, property type and propertycard
import { useState, useEffect } from "react";
import type { Property } from "../types/Property";
import PropertyCard from "../components/PropertyCard";

const AsyncPropertyPage = () => {

    // useState
const [properties, setProperties] = useState<Property[]>([]);
const [selectedLocation, setSelectedLocation] = useState("");
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState("");

// useEffect
useEffect(() => {
    const loadProperties = async () => {
    try {
        const response = await fetch("/properties.json");

        if (!response.ok) {
            throw new Error("Could not load properties")
        }
        const data: Property[] = await response.json();

        console.log("Loaded properties:", data);
console.log("Number loaded:", data.length);

        setProperties(data)
    } catch {
        setError("Unable to load properties. Please try again.")
    } finally {
        setIsLoading(false);
    };

};

loadProperties();
}, []);

// location filter
   // Calculate matching properties
    // filtered properties variable
    const filteredProperties = selectedLocation === "" ? properties : properties.filter(p => p.location === selectedLocation
    );

  return (
    <section>
        <h1>Find Your Next Home</h1>
        <label htmlFor="locationFliter">Filter by location</label>
        <select 
        id="locationFilter"
        value={selectedLocation}
        onChange={e => setSelectedLocation(e.currentTarget.value)}
        >
    <option value="">All locations</option>
    <option value="Ikeja">Ikeja</option>
    <option value="Lekki">Lekki</option>
        </select>

        {
            isLoading ? 
            (<p>loading properties...</p>)
            : error ? (<p>{error}</p>) 
            : (
                <>
            <p className="mb-4">Properties found: {filteredProperties.length}</p>
                
                {/* filter  */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {
                        filteredProperties.map(p => (
                            <PropertyCard 
                            key={p.id}
                            property={p}
                            />
                        ))
                    }
                </div>
                </>
            )
        }
    </section>
  )
}

export default AsyncPropertyPage

// 6. Load the data
// In `PropertyPage.tsx`:
// 1. Import `useState` and `useEffect`, the `Property` type, and `PropertyCard`.
// 2. Create these state variables:
//    | State | Type | Initial value |
//    |---|---|---|
//    | `properties` | `Property[]` | `[]` |
//    | `selectedLocation` | `string` | `""` |
//    | `isLoading` | `boolean` | `true` |
//    | `error` | `string` | `""` |

// 3. Inside a `useEffect` with an empty dependency array, create and call an async function named `loadProperties`.
// 4. Use `fetch("/properties.json")` to request the data.
// 5. Check `response.ok`. Throw an error if it is false.
// 6. Convert the response to JSON and pass the data to `setProperties`.
// 7. Use `catch` to set an error message.
// 8. Use `finally` to set `isLoading` to `false`.

// This practices fetching data from a local JSON file. A backend API can replace the file later.

// 7. Add the location filter

// Inside `PropertyPage`:

// 1. Create a variable named `filteredProperties`.
// 2. If `selectedLocation` is `""`, use all properties.
// 3. Otherwise, use `.filter()` to keep properties whose `location` equals `selectedLocation`.
// 4. Return a page containing:
//    - An `<h1>` displaying **Find Your Next Home**.
//    - A label displaying *Filter by location*.
//    - A `<select>` connected to the label with matching `id` and `htmlFor`.
// 5. Give the select `value={selectedLocation}` and this inline handler:

//    onChange={(event) => setSelectedLocation(event.currentTarget.value)}

// 6. Add these options:

//    | Displayed text | Value |
//    |---|---|
//    | All locations | `""` |
//    | Ikeja | `"Ikeja"` |
//    | Lekki | `"Lekki"` |

// 8. Display the results

// Below the dropdown:

// 1. Display Loading properties... while `isLoading` is true.
// 2. Display `{error}` if loading fails.
// 3. When loading succeeds, display the number of matching properties using `filteredProperties.length`.
// 4. Use `.map()` to render a `PropertyCard` for each filtered property.
// 5. Pass `key={property.id}` and `property={property}` to each card.
// 6. Give the cards’ container these classes:
//    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"

// 9. Render and check the page

// 1. Export `PropertyPage` as the default export.
// 2. Import and render `<PropertyPage />` inside `App.tsx`.
// 3. Test the dropdown and resize the browser.
// 4. Calculate the filtered list directly for now; this small list does not need `useMemo`.

// Expected outcome: The page initially displays three property cards. Selecting **Ikeja** displays two cards; selecting **Lekki** displays one. The layout changes from one to two to three columns as the screen gets wider.