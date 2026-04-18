import '../../App.css'

const DemoHomePage = () => {
    return (
        <div className='homepage'>
            <h1 className='yellow-header'>Nudi Noted</h1>
            <h2 className='subtitle'>Slugs, sea stars, and seaside surprises.</h2>

            <p>With over 200,000 marine species on our planet, it can be hard to know them all.</p>
            <p>That's where Nudi Noted comes in.</p>
            <p>Snap a photo and share it with the community. Ask about what species it is! Where you can find more! Or maybe just show off your findings!
                Talk to aquatic lovers like yourself about the creatures you've found on your adventures - whether you found a slug, sea star, or other
                seaside surprise!
            </p>

            <div style={{ marginTop: '2rem' }}>
                <p style={{ fontSize: '0.95rem', color: '#518294', fontStyle: 'italic' }}>
                    💡 This is demo mode. Click the logo to explore sample posts and see the design!
                </p>
            </div>
        </div>
    )
}

export default DemoHomePage
