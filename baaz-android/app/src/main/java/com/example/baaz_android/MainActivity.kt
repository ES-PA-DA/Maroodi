package com.example.baaz_android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.PreviewScreenSizes
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.createGraph
import com.example.baaz_android.ui.theme.BaazandroidTheme


@PreviewScreenSizes
@Composable
fun BaazandroidApp() {
    val navController = rememberNavController()
    var currentDestination by rememberSaveable { mutableStateOf(AppDestinations.STORE) }
    val graph = navController.createGraph(startDestination = Screen.Store.route) {
            composable(route = Screen.Store.route) {
                StoreScreen()
            }
            composable(route = Screen.Profile.route) {
                ProfileScreen()
            }
            composable(route = Screen.Favorites.route) {
                FavoritesScreen()
            }
    }

    NavigationSuiteScaffold(
        navigationSuiteItems = {
            AppDestinations.entries.forEach {
                item(
                    icon = {
                        Icon(
                            painterResource(it.icon),
                            contentDescription = it.label
                        )
                    },
                    label = { Text(it.label) },
                    selected = it == currentDestination,
                    onClick = {
                        currentDestination = it
                        navController.navigate(it.route)
                    }
                )
            }
        }
    ) {
        NavHost(navController=navController, graph=graph)
    }
}


sealed class Screen(val route: String) {
    object Store: Screen("store_screen")
    object Favorites: Screen("favorites_screen")
    object Profile: Screen("profile_screen")
}


enum class AppDestinations(
    val label: String,
    val icon: Int,
    val route: String,
) {
    STORE("Stores", R.drawable.ic_store, route = Screen.Store.route),
    FAVORITES("Favorites", R.drawable.ic_favorite, route = Screen.Favorites.route),
    PROFILE("Profile", R.drawable.ic_account_box, route = Screen.Profile.route),
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BaazandroidTheme {
                BaazandroidApp()
            }
        }
    }
}

