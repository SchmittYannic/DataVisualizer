import { Link } from "react-router-dom";
import "./Impressum.css"

const Impressum = () => {

    const firstname = String(import.meta.env.VITE_IMPRESSUM_FIRSTNAME) ?? "";
    const lastname = String(import.meta.env.VITE_IMPRESSUM_LASTNAME) ?? "";
    const street = String(import.meta.env.VITE_IMPRESSUM_STREET) ?? "";
    const plz = String(import.meta.env.VITE_IMPRESSUM_PLZ) ?? "";
    const city = String(import.meta.env.VITE_IMPRESSUM_CITY) ?? "";
    const email = String(import.meta.env.VITE_IMPRESSUM_EMAIL) ?? "";

    return (
        <main className="impressum">
            <div className="max-container">
                <h1>
                    Impressum
                </h1>
                <div className="impressum-content">
                    <p>
                        {firstname} {lastname}
                    </p>
                    <p>
                        {street}
                    </p>
                    <p>
                        {plz} {city}
                    </p>
                    <p>
                        Email: <a
                            href={`mailto:${email}`}
                        >
                            {email}
                        </a>
                    </p>
                </div>
                <div className="impressum-btn-wrapper">
                    <Link
                        className="btn next-btn"
                        to={"/"}
                        title="Zurück zur Startseite"
                    >
                        Startseite
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Impressum