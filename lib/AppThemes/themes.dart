import 'package:flutter/material.dart';

class AppTheme {
  // Color Palette
  static const Color primaryGreen = Color(0xFF2E7D32);
  static const Color lightGreen = Color(0xFF4CAF50);
  static const Color darkGreen = Color(0xFF1B5E20);
  static const Color accentGreen = Color(0xFF66BB6A);
  static const Color backgroundGreen = Color(0xFFE8F5E8);
  static const Color surfaceGreen = Color(0xFFF1F8E9);
  static const Color errorGreen = Color(0xFF689F38);

  static ThemeData greenTheme = ThemeData(
    // Primary Colors
    primarySwatch: Colors.green,
    primaryColor: primaryGreen,
    scaffoldBackgroundColor: backgroundGreen,

    // Color Scheme
    colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.green).copyWith(
      primary: primaryGreen,
      secondary: accentGreen,
      background: backgroundGreen,
      surface: surfaceGreen,
      error: errorGreen,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onBackground: darkGreen,
      onSurface: darkGreen,
    ),

    // App Bar Theme
    appBarTheme: AppBarTheme(
      backgroundColor: primaryGreen,
      elevation: 0,
      iconTheme: IconThemeData(color: Colors.white, size: 24),
      actionsIconTheme: IconThemeData(color: Colors.white, size: 24),
      titleTextStyle: TextStyle(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.bold,
        letterSpacing: 0.5,
      ),
      centerTitle: true,
    ),

    // Icon Theme
    iconTheme: IconThemeData(color: primaryGreen, size: 24),
    primaryIconTheme: IconThemeData(color: Colors.white, size: 24),

    // Text Theme
    textTheme: TextTheme(
      displayLarge: TextStyle(
        color: darkGreen,
        fontSize: 32,
        fontWeight: FontWeight.bold,
        letterSpacing: 0.5,
      ),
      displayMedium: TextStyle(
        color: darkGreen,
        fontSize: 28,
        fontWeight: FontWeight.bold,
        letterSpacing: 0.5,
      ),
      displaySmall: TextStyle(
        color: darkGreen,
        fontSize: 24,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
      ),
      headlineLarge: TextStyle(
        color: primaryGreen,
        fontSize: 22,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.25,
      ),
      headlineMedium: TextStyle(
        color: primaryGreen,
        fontSize: 20,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.25,
      ),
      headlineSmall: TextStyle(
        color: primaryGreen,
        fontSize: 18,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.25,
      ),
      titleLarge: TextStyle(
        color: darkGreen,
        fontSize: 16,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.15,
      ),
      titleMedium: TextStyle(
        color: darkGreen,
        fontSize: 14,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.1,
      ),
      titleSmall: TextStyle(
        color: darkGreen,
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.1,
      ),
      bodyLarge: TextStyle(
        color: darkGreen,
        fontSize: 16,
        fontWeight: FontWeight.normal,
        letterSpacing: 0.15,
      ),
      bodyMedium: TextStyle(
        color: darkGreen,
        fontSize: 14,
        fontWeight: FontWeight.normal,
        letterSpacing: 0.25,
      ),
      bodySmall: TextStyle(
        color: Colors.grey[600],
        fontSize: 12,
        fontWeight: FontWeight.normal,
        letterSpacing: 0.25,
      ),
      labelLarge: TextStyle(
        color: Colors.white,
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.1,
      ),
      labelMedium: TextStyle(
        color: primaryGreen,
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
      labelSmall: TextStyle(
        color: Colors.grey[600],
        fontSize: 10,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
    ),

    // Button Themes
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryGreen,
        foregroundColor: Colors.white,
        elevation: 4,
        shadowColor: primaryGreen.withOpacity(0.3),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        textStyle: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.5,
        ),
      ),
    ),

    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primaryGreen,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        textStyle: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.25,
        ),
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: primaryGreen,
        side: BorderSide(color: primaryGreen, width: 2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        textStyle: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.5,
        ),
      ),
    ),

    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: accentGreen,
      foregroundColor: Colors.white,
      elevation: 6,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    ),

    // Bottom Navigation Theme
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: primaryGreen,
      selectedItemColor: Colors.white,
      unselectedItemColor: Colors.white70,
      selectedLabelStyle: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
      ),
      unselectedLabelStyle: TextStyle(
        fontSize: 10,
        fontWeight: FontWeight.normal,
        letterSpacing: 0.5,
      ),
      type: BottomNavigationBarType.fixed,
      elevation: 8,
    ),

    // Input Decoration Theme
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(15),
        borderSide: BorderSide(color: Colors.grey[300]!, width: 2),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(15),
        borderSide: BorderSide(color: Colors.grey[300]!, width: 2),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(15),
        borderSide: BorderSide(color: accentGreen, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(15),
        borderSide: BorderSide(color: Colors.red, width: 2),
      ),
      contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      hintStyle: TextStyle(
        color: Colors.grey[400],
        fontSize: 14,
        fontWeight: FontWeight.normal,
      ),
      labelStyle: TextStyle(
        color: primaryGreen,
        fontSize: 14,
        fontWeight: FontWeight.w600,
      ),
      prefixIconColor: primaryGreen,
      suffixIconColor: primaryGreen,
    ),

    // Card Theme
    cardTheme: CardThemeData(
      color: Colors.white,
      elevation: 4,
      shadowColor: primaryGreen.withOpacity(0.1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    ),

    // Divider Theme
    dividerTheme: DividerThemeData(
      color: Colors.grey[300],
      thickness: 1,
      space: 20,
    ),

    // Chip Theme
    chipTheme: ChipThemeData(
      backgroundColor: surfaceGreen,
      selectedColor: accentGreen,
      labelStyle: TextStyle(
        color: darkGreen,
        fontSize: 12,
        fontWeight: FontWeight.w500,
      ),
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
    ),
  );
}
