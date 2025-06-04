import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Page non trouvée
                </h2>
                <p className="text-gray-600 mb-8">
                    Désolé, la page que vous cherchez n'existe pas.
                </p>
                <Link to="/">
                    <Button>Retour à l'accueil</Button>
                </Link>
            </div>
        </div>
    );
}
