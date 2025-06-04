export default function About() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos</h1>
            <div className="prose prose-lg">
                <p className="text-gray-600 mb-4">
                    Bienvenue sur notre application ! Cette page présente notre
                    projet et notre équipe.
                </p>
                <p className="text-gray-600 mb-4">
                    Cette application a été développée avec React, Vite et
                    TypeScript, en utilisant React Router pour la navigation et
                    Tailwind CSS pour le style.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Technologies utilisées
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>React 19</li>
                    <li>TypeScript</li>
                    <li>Vite</li>
                    <li>React Router</li>
                    <li>Tailwind CSS</li>
                    <li>Radix UI</li>
                </ul>
            </div>
        </div>
    );
}
