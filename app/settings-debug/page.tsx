import { fetchSettings } from "@/lib/sanity/queries";

export default async function SettingsDebugPage() {
    const settings = await fetchSettings();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Sanity Settings Debug</h1>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Raw Settings Data</h2>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-96 text-sm">
                        {JSON.stringify(settings, null, 2)}
                    </pre>
                </div>

                {settings && (
                    <>
                        {/* Branding Section */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">🎨 Branding</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-semibold text-gray-700">Site Title:</span>
                                    <p className="text-gray-900">{settings.siteTitle}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Short Title:</span>
                                    <p className="text-gray-900">{settings.shortTitle}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Tagline:</span>
                                    <p className="text-gray-900">{settings.tagline}</p>
                                </div>
                                {settings.themeColors && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Theme Colors:</span>
                                        <div className="flex gap-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-12 h-12 rounded border-2 border-gray-300"
                                                    style={{ backgroundColor: settings.themeColors.primary }}
                                                />
                                                <span className="text-sm">Primary: {settings.themeColors.primary}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-12 h-12 rounded border-2 border-gray-300"
                                                    style={{ backgroundColor: settings.themeColors.secondary }}
                                                />
                                                <span className="text-sm">
                                                    Secondary: {settings.themeColors.secondary}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-12 h-12 rounded border-2 border-gray-300"
                                                    style={{ backgroundColor: settings.themeColors.accent }}
                                                />
                                                <span className="text-sm">Accent: {settings.themeColors.accent}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Institution Profile Section */}
                        {settings.institutionProfile && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                                    🏫 Institution Profile
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-semibold text-gray-700">About Title:</span>
                                        <p className="text-gray-900">{settings.institutionProfile.aboutTitle}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Overview:</span>
                                        <p className="text-gray-900 text-sm leading-relaxed">
                                            {settings.institutionProfile.overview}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Vision:</span>
                                        <p className="text-gray-900 text-sm leading-relaxed">
                                            {settings.institutionProfile.vision}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Mission:</span>
                                        <p className="text-gray-900 text-sm leading-relaxed">
                                            {settings.institutionProfile.mission}
                                        </p>
                                    </div>

                                    {/* CHED Programs */}
                                    {settings.institutionProfile.chedPrograms &&
                                        settings.institutionProfile.chedPrograms.length > 0 && (
                                            <div>
                                                <span className="font-semibold text-gray-700">CHED Programs:</span>
                                                <div className="mt-2 space-y-3">
                                                    {settings.institutionProfile.chedPrograms.map((program, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-blue-50 p-4 rounded border-l-4 border-blue-500"
                                                        >
                                                            <h4 className="font-semibold text-blue-900">
                                                                {program.name}
                                                            </h4>
                                                            {program.majors && program.majors.length > 0 && (
                                                                <p className="text-sm text-blue-700 mt-1">
                                                                    Majors: {program.majors.join(", ")}
                                                                </p>
                                                            )}
                                                            {program.description && (
                                                                <p className="text-sm text-gray-700 mt-2">
                                                                    {program.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    {/* TESDA Programs */}
                                    {settings.institutionProfile.tesdaPrograms &&
                                        settings.institutionProfile.tesdaPrograms.length > 0 && (
                                            <div>
                                                <span className="font-semibold text-gray-700">TESDA Programs:</span>
                                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {settings.institutionProfile.tesdaPrograms.map((program, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-green-50 p-3 rounded border-l-4 border-green-500"
                                                        >
                                                            <h4 className="font-semibold text-green-900 text-sm">
                                                                {program.name}
                                                            </h4>
                                                            {program.description && (
                                                                <p className="text-xs text-gray-700 mt-1">
                                                                    {program.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    {/* Entry Requirements */}
                                    {settings.institutionProfile.entryRequirements && (
                                        <div>
                                            <span className="font-semibold text-gray-700">Entry Requirements:</span>
                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {settings.institutionProfile.entryRequirements.freshmen && (
                                                    <div className="bg-purple-50 p-3 rounded">
                                                        <h4 className="font-semibold text-purple-900 text-sm mb-2">
                                                            Freshmen
                                                        </h4>
                                                        <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                                            {settings.institutionProfile.entryRequirements.freshmen.map(
                                                                (req, idx) => (
                                                                    <li key={idx}>{req}</li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                                {settings.institutionProfile.entryRequirements.transferees && (
                                                    <div className="bg-purple-50 p-3 rounded">
                                                        <h4 className="font-semibold text-purple-900 text-sm mb-2">
                                                            Transferees
                                                        </h4>
                                                        <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                                            {settings.institutionProfile.entryRequirements.transferees.map(
                                                                (req, idx) => (
                                                                    <li key={idx}>{req}</li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                                {settings.institutionProfile.entryRequirements.crossRegistrants && (
                                                    <div className="bg-purple-50 p-3 rounded">
                                                        <h4 className="font-semibold text-purple-900 text-sm mb-2">
                                                            Cross Registrants
                                                        </h4>
                                                        <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                                            {settings.institutionProfile.entryRequirements.crossRegistrants.map(
                                                                (req, idx) => (
                                                                    <li key={idx}>{req}</li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                                {settings.institutionProfile.entryRequirements.degreeHolders && (
                                                    <div className="bg-purple-50 p-3 rounded">
                                                        <h4 className="font-semibold text-purple-900 text-sm mb-2">
                                                            Degree Holders
                                                        </h4>
                                                        <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                                                            {settings.institutionProfile.entryRequirements.degreeHolders.map(
                                                                (req, idx) => (
                                                                    <li key={idx}>{req}</li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contact Directory */}
                        {settings.contactDirectory && settings.contactDirectory.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                                    📞 Contact Directory
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {settings.contactDirectory.map((contact, idx) => (
                                        <div key={idx} className="bg-gray-50 p-4 rounded border border-gray-200">
                                            <h3 className="font-semibold text-gray-900">{contact.label}</h3>
                                            {contact.email && (
                                                <p className="text-sm text-gray-700">📧 {contact.email}</p>
                                            )}
                                            {contact.phone && (
                                                <p className="text-sm text-gray-700">📱 {contact.phone}</p>
                                            )}
                                            {contact.hours && (
                                                <p className="text-sm text-gray-600">🕐 {contact.hours}</p>
                                            )}
                                            {contact.url && (
                                                <a href={contact.url} className="text-sm text-blue-600 hover:underline">
                                                    🔗 Visit
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Addresses */}
                        {settings.addresses && settings.addresses.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                                    📍 Addresses
                                </h2>
                                <div className="space-y-4">
                                    {settings.addresses.map((addr, idx) => (
                                        <div key={idx} className="bg-gray-50 p-4 rounded border border-gray-200">
                                            <h3 className="font-semibold text-gray-900">{addr.label}</h3>
                                            {addr.address && (
                                                <p className="text-sm text-gray-700 whitespace-pre-line">
                                                    {addr.address}
                                                </p>
                                            )}
                                            {addr.phone && <p className="text-sm text-gray-700">📱 {addr.phone}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {settings.socialLinks && settings.socialLinks.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                                    🌐 Social Links
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    {settings.socialLinks.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded border border-blue-200 transition-colors"
                                        >
                                            <span className="font-semibold text-blue-900">{social.platform}</span>
                                            {social.handle && (
                                                <span className="text-sm text-blue-700 ml-2">{social.handle}</span>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Emergency Alert */}
                        {settings.emergencyAlert && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
                                    🚨 Emergency Alert
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">Active:</span>{" "}
                                        <span
                                            className={
                                                settings.emergencyAlert.isActive ? "text-red-600" : "text-green-600"
                                            }
                                        >
                                            {settings.emergencyAlert.isActive ? "Yes" : "No"}
                                        </span>
                                    </p>
                                    {settings.emergencyAlert.severity && (
                                        <p>
                                            <span className="font-semibold">Severity:</span>{" "}
                                            {settings.emergencyAlert.severity}
                                        </p>
                                    )}
                                    {settings.emergencyAlert.message && (
                                        <p className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                                            {settings.emergencyAlert.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {!settings && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-red-900 mb-2">⚠️ No Settings Found</h2>
                        <p className="text-red-700">
                            Unable to fetch settings from Sanity. Please check your API configuration.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
