import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    HOME PAGE - API REST Express
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Découvrez notre application de démonstration construite avec
                    React, TypeScript et Express. Une architecture moderne pour
                    vos projets web.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Frontend</CardTitle>
                        <CardDescription>
                            Interface utilisateur moderne avec React
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                            <li>React 18 avec TypeScript</li>
                            <li>Tailwind CSS pour le styling</li>
                            <li>React Router pour la navigation</li>
                            <li>Composants UI réutilisables</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Backend</CardTitle>
                        <CardDescription>
                            API REST robuste avec Express
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                            <li>Express.js avec TypeScript</li>
                            <li>Architecture MVC</li>
                            <li>Validation des données</li>
                            <li>Gestion d'erreurs centralisée</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
