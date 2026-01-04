export default function Footer () {

    return (
        <footer className="border-t py-2">
            <div className="container text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} WordBase. All rights reserved.
            </div>
        </footer>
    )
}


